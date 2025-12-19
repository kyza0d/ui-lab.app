"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button"
import { Card } from "../Card"
import { HiExclamationCircle, HiExclamation, HiInformationCircle, HiCheckCircle } from "react-icons/hi"

export interface ConfirmationProps {
  mode?: "inline" | "dialog" | "auto"
  severity?: "low" | "medium" | "high" | "critical"
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  triggerLabel: string
  confirmLabel?: string
  cancelLabel?: string
  disabled?: boolean
  title?: string
  description?: string
  icon?: React.ReactNode
  destructiveActionWarning?: string
  countdownSeconds?: number
  requiresReason?: boolean
  confirmationText?: string
  autoResetAfter?: number
}

const severityConfig = {
  low: {
    icon: <HiInformationCircle className="w-5 h-5 text-blue-500" />,
    color: "bg-blue-500/20 border-blue-500/30",
    buttonVariant: "primary",
  },
  medium: {
    icon: <HiExclamation className="w-5 h-5 text-yellow-500" />,
    color: "bg-yellow-500/20 border-yellow-500/30",
    buttonVariant: "secondary",
  },
  high: {
    icon: <HiExclamationCircle className="w-5 h-5 text-orange-500" />,
    color: "bg-orange-500/20 border-orange-500/30",
    buttonVariant: "secondary",
  },
  critical: {
    icon: <HiExclamationCircle className="w-5 h-5 text-red-500" />,
    color: "bg-red-500/20 border-red-500/30",
    buttonVariant: "secondary",
  },
}

/**
 * Confirmation component for destructive or important actions
 */
const Confirmation = React.forwardRef<HTMLDivElement, ConfirmationProps>(
  (
    {
      mode = "auto",
      severity = "medium",
      onConfirm,
      onCancel,
      triggerLabel,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      disabled = false,
      title,
      description,
      icon,
      destructiveActionWarning,
      countdownSeconds,
      requiresReason = false,
      confirmationText,
      autoResetAfter,
    },
    ref
  ) => {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [countdown, setCountdown] = useState(countdownSeconds || 0)
    const [inputValue, setInputValue] = useState("")
    const [showDialogMode, setShowDialogMode] = useState(false)

    // Determine actual mode
    const effectiveMode = mode === "auto"
      ? (severity === "low" || severity === "medium") ? "inline" : "dialog"
      : mode

    // Handle countdown timer
    useEffect(() => {
      if (!isConfirming || countdown <= 0) return

      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }, [isConfirming, countdown])

    // Auto-reset inline confirmations
    useEffect(() => {
      if (!isConfirming || !autoResetAfter) return

      const timer = setTimeout(() => {
        resetConfirmation()
      }, autoResetAfter)

      return () => clearTimeout(timer)
    }, [isConfirming, autoResetAfter])

    const resetConfirmation = () => {
      setIsConfirming(false)
      setError(null)
      setCountdown(countdownSeconds || 0)
      setInputValue("")
      setShowDialogMode(false)
    }

    const handleTrigger = () => {
      if (effectiveMode === "dialog") {
        setShowDialogMode(true)
        setIsConfirming(true)
      } else {
        setIsConfirming(true)
      }
      setCountdown(countdownSeconds || 0)
    }

    const handleConfirm = async () => {
      if (requiresReason && inputValue !== confirmationText) {
        setError(`Please type "${confirmationText}" to confirm`)
        return
      }

      if (countdownSeconds && countdown > 0) {
        setError(`Please wait ${countdown} seconds before confirming`)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        await Promise.resolve(onConfirm())
        resetConfirmation()
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setIsLoading(false)
      }
    }

    const handleCancel = () => {
      onCancel?.()
      resetConfirmation()
    }

    const config = severityConfig[severity]
    const canConfirm = !countdownSeconds || countdown === 0
    const confirmationValid = !requiresReason || inputValue === confirmationText

    if (effectiveMode === "inline" && !showDialogMode) {
      return (
        <div ref={ref}>
          {!isConfirming ? (
            <Button
              onClick={handleTrigger}
              isDisabled={disabled || isLoading}
              variant={config.buttonVariant as any}
            >
              {triggerLabel}
            </Button>
          ) : (
            <Card className="max-w-sm">
              <Card.Body className="space-y-3">
                {description && (
                  <p className="text-sm text-foreground-300">{description}</p>
                )}
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleConfirm}
                    isDisabled={!canConfirm || !confirmationValid || isLoading}
                  >
                    {isLoading ? "..." : confirmLabel}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    isDisabled={isLoading}
                  >
                    {cancelLabel}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      )
    }

    // Dialog mode
    if (showDialogMode) {
      return (
        <div ref={ref}>
          {isConfirming && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Card className="max-w-md mx-4">
                <Card.Header className="space-y-2">
                  <div className="flex items-start gap-3">
                    {icon || config.icon}
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground-100">
                        {title || triggerLabel}
                      </h4>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="space-y-4">
                  {description && (
                    <p className="text-sm text-foreground-300">{description}</p>
                  )}
                  {destructiveActionWarning && (
                    <div className={cn(
                      "p-3 rounded-lg border text-sm",
                      config.color
                    )}>
                      {destructiveActionWarning}
                    </div>
                  )}
                  {countdownSeconds && countdown > 0 && (
                    <div className="text-sm text-foreground-400">
                      Please wait {countdown}s before confirming
                    </div>
                  )}
                  {requiresReason && (
                    <div>
                      <label className="text-sm ml-1 text-foreground-300">
                        Type "{confirmationText}" to confirm:
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          setError(null)
                        }}
                        placeholder={confirmationText}
                        className="w-full mt-2 px-3 py-2 rounded-lg bg-background-800 border border-background-700 text-foreground-100 text-sm"
                      />
                    </div>
                  )}
                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}
                </Card.Body>
                <Card.Footer className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancel}
                    isDisabled={isLoading}
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleConfirm}
                    isDisabled={!canConfirm || !confirmationValid || isLoading}
                  >
                    {isLoading ? "..." : confirmLabel}
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref}>
        <Button
          onClick={handleTrigger}
          isDisabled={disabled || isLoading}
          variant={config.buttonVariant as any}
        >
          {triggerLabel}
        </Button>
      </div>
    )
  }
)

Confirmation.displayName = "Confirmation"

export { Confirmation }
