import { describe, it, expect } from "vitest"
import {
  validateTransactionFilters,
  validatePeriod,
  validateFiltersSecurity,
  TransactionValidationError
} from "./validators"
import type { TransactionFilters } from "@/lib/types"

describe("validators", () => {
  describe("validateTransactionFilters", () => {
    it("debe validar filtros válidos correctamente", () => {
      const validFilters: TransactionFilters = {
        page: 1,
        pageSize: 20,
        period: "today",
        search: "test",
        status: "SUCCESSFUL"
      }

      const result = validateTransactionFilters(validFilters)

      expect(result).toEqual({
        page: 1,
        pageSize: 20,
        period: "today",
        search: "test",
        status: "SUCCESSFUL"
      })
    })

    it("debe aplicar valores por defecto para page y pageSize", () => {
      const result = validateTransactionFilters({})

      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(20)
    })

    it("debe rechazar page fuera de rango", () => {
      expect(() => validateTransactionFilters({ page: 0 })).toThrow(TransactionValidationError)
      expect(() => validateTransactionFilters({ page: -1 })).toThrow(TransactionValidationError)
      expect(() => validateTransactionFilters({ page: 10001 })).toThrow(TransactionValidationError)
    })

    it("debe rechazar búsquedas con caracteres especiales peligrosos", () => {
      expect(() => validateTransactionFilters({ search: "test<script>" })).toThrow(TransactionValidationError)
      expect(() => validateTransactionFilters({ search: "'; DROP TABLE--" })).toThrow(TransactionValidationError)
    })

    it("debe rechazar búsquedas demasiado largas", () => {
      const longSearch = "a".repeat(101)
      expect(() => validateTransactionFilters({ search: longSearch })).toThrow(TransactionValidationError)
    })

    it("debe validar paymentMethod como array", () => {
      const result = validateTransactionFilters({
        paymentMethod: "NEQUI,CARD"
      } as unknown as TransactionFilters)

      expect(result.paymentMethod).toEqual(["NEQUI", "CARD"])
    })

    it("debe proporcionar errores de validación estructurados", () => {
      try {
        validateTransactionFilters({ page: -1 })
        expect.fail("Debería haber lanzado error")
      } catch (error) {
        expect(error).toBeInstanceOf(TransactionValidationError)
        const validationError = error as TransactionValidationError
        expect(validationError.validationErrors).toBeDefined()
        expect(validationError.validationErrors.length).toBeGreaterThan(0)
        expect(validationError.validationErrors[0]).toHaveProperty("field")
        expect(validationError.validationErrors[0]).toHaveProperty("message")
      }
    })
  })

  describe("validatePeriod", () => {
    it("debe validar períodos válidos", () => {
      expect(validatePeriod("today")).toBe("today")
      expect(validatePeriod("week")).toBe("week")
      expect(validatePeriod("month")).toBe("month")
    })

    it("debe retornar undefined para valores nulos o undefined", () => {
      expect(validatePeriod(undefined)).toBeUndefined()
      expect(validatePeriod(null)).toBeUndefined()
    })

    it("debe rechazar períodos inválidos", () => {
      expect(() => validatePeriod("invalid")).toThrow(TransactionValidationError)
      expect(() => validatePeriod("year")).toThrow(TransactionValidationError)
      expect(() => validatePeriod(123 as unknown as string)).toThrow(TransactionValidationError)
    })
  })

  describe("validateFiltersSecurity", () => {
    it("debe validar filtros seguros", () => {
      const validFilters: TransactionFilters = {
        page: 1,
        pageSize: 20,
        period: "today"
      }

      expect(validateFiltersSecurity(validFilters)).toBe(true)
    })

    it("debe rechazar page fuera de rango de seguridad", () => {
      expect(() => validateFiltersSecurity({ page: 0 })).toThrow(TransactionValidationError)
      expect(() => validateFiltersSecurity({ page: -1 })).toThrow(TransactionValidationError)
      expect(() => validateFiltersSecurity({ page: 10001 })).toThrow(TransactionValidationError)
    })

    it("debe rechazar demasiados métodos de pago (límite 10)", () => {
      const tooManyMethods = Array(11).fill("NEQUI") as unknown as TransactionFilters['paymentMethod']
      expect(() => validateFiltersSecurity({
        paymentMethod: tooManyMethods
      })).toThrow(TransactionValidationError)
    })
  })

  describe("TransactionValidationError", () => {
    it("debe crear error con mensaje y validationErrors", () => {
      const errors = [
        { field: "page", message: "Valor inválido" },
        { field: "search", message: "Búsqueda inválida" }
      ]

      const error = new TransactionValidationError("Error de validación", errors)

      expect(error.name).toBe("TransactionValidationError")
      expect(error.code).toBe("VALIDATION_ERROR")
      expect(error.message).toBe("Error de validación")
      expect(error.validationErrors).toEqual(errors)
    })

    it("debe ser instancia de Error", () => {
      const error = new TransactionValidationError("Test")
      expect(error).toBeInstanceOf(Error)
    })
  })
})
