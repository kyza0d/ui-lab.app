"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button"
import { Card } from "../Card"
import { CircleAlert, TriangleAlert, Info } from "lucide-react"
import styles from "./Confirm.module.css"

export interface ConfirmProps {
  /** Display mode: inline expands in place, dialog shows a modal, auto chooses based on severity */
  mode?: "inline" | "dialog" | "auto"
  /** Severity level that affects styling and default mode selection */
  severity?: "low" | "medium" | "high" | "critical"
  /** Called when the user confirms the action */
  onConfirm: () => void | Promise<void>
  /** Called when the user cancels the action */
  onCancel?: () => void
  /** Label for the trigger button */
  triggerLabel: string
  /** Label for the confirm button */
  confirmLabel?: string
  /** Label for the cancel button */
  cancelLabel?: string
  /** Whether the trigger button is disabled */
  disabled?: boolean
  /** Title shown in dialog mode */
  title?: string
  /** Description text shown during the confirm step */
  description?: string
  /** Custom icon shown in the confirm header */
  icon?: React.ReactNode
  /** Warning message displayed in a colored box before confirming */
  destructiveActionWarning?: string
  /** Seconds the user must wait before the confirm button becomes active */
  countdownSeconds?: number
  /** Whether the user must type confirmText to enable the confirm button */
  requiresReason?: boolean
  /** Text the user must type to confirm when requiresReason is true */
  confirmText?: string
  /** Milliseconds after which the inline confirm auto-resets to idle state */
  autoResetAfter?: number
}

const severityConfig = {
  low: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    warningBoxClass: styles["warning-box-low"],
    buttonVariant: "primary" as const,
  },
  medium: {
    icon: <TriangleAlert className="w-5 h-5 text-yellow-500" />,
    warningBoxClass: styles["warning-box-medium"],
    buttonVariant: "secondary" as const,
  },
  high: {
    icon: <CircleAlert className="w-5 h-5 text-orange-500" />,
    warningBoxClass: styles["warning-box-high"],
    buttonVariant: "secondary" as const,
  },
  critical: {
    icon: <TriangleAlert className="w-5 h-5 text-red-500" />,
    warningBoxClass: styles["warning-box-critical"],
    buttonVariant: "secondary" as const,
  },
} as const

/** Modal dialog for confirming destructive actions with context and choices */
const Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>(
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
      confirmText,
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

    // Auto-reset inline confirms
    useEffect(() => {
      if (!isConfirming || !autoResetAfter) return

      const timer = setTimeout(() => {
        resetConfirm()
      }, autoResetAfter)

      return () => clearTimeout(timer)
    }, [isConfirming, autoResetAfter])

    const resetConfirm = () => {
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
      if (requiresReason && inputValue !== confirmText) {
        setError(`Please type "${confirmText}" to confirm`)
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
        resetConfirm()
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setIsLoading(false)
      }
    }

    const handleCancel = () => {
      onCancel?.()
      resetConfirm()
    }

    const config = severityConfig[severity]
    const canConfirm = !countdownSeconds || countdown === 0
    const confirmValid = !requiresReason || inputValue === confirmText

    if (effectiveMode === "inline" && !showDialogMode) {
      return (
        <div ref={ref} className={styles.container}>
          {!isConfirming ? (
            <Button
              onClick={handleTrigger}
              isDisabled={disabled || isLoading}
              variant={config.buttonVariant}
            >
              {triggerLabel}
            </Button>
          ) : (
            <Card className={cn(styles.card)}>
              <Card.Body className={cn(styles.body, styles['body-compact'])}>
                {description && (
                  <p className={styles.description}>{description}</p>
                )}
                {error && (
                  <p className={styles['error-message']}>{error}</p>
                )}
                <div className={cn(styles.actions, styles['actions-inline'])}>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleConfirm}
                    isDisabled={!canConfirm || !confirmValid || isLoading}
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
            <div className={styles['dialog-overlay']}>
              <Card className={cn(styles['dialog-card'])}>
                <Card.Header className={styles.body}>
                  <div className={styles.header}>
                    {icon || config.icon}
                    <div className={styles['header-content']}>
                      <h4 className={styles['header-title']}>
                        {title || triggerLabel}
                      </h4>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className={cn(styles.body)}>
                  {description && (
                    <p className={styles.description}>{description}</p>
                  )}
                  {destructiveActionWarning && (
                    <div className={cn(
                      styles['warning-box'],
                      config.warningBoxClass
                    )}>
                      {destructiveActionWarning}
                    </div>
                  )}
                  {countdownSeconds && countdown > 0 && (
                    <div className={styles['countdown-text']}>
                      Please wait {countdown}s before confirming
                    </div>
                  )}
                  {requiresReason && (
                    <div>
                      <label className={styles['input-label']}>
                        Type "{confirmText}" to confirm:
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          setError(null)
                        }}
                        placeholder={confirmText}
                        className={styles.input}
                      />
                    </div>
                  )}
                  {error && (
                    <p className={styles['error-message']}>{error}</p>
                  )}
                </Card.Body>
                <Card.Footer className={cn(styles.actions, styles['actions-dialog'])}>
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
                    isDisabled={!canConfirm || !confirmValid || isLoading}
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
      <div ref={ref} className={styles.container}>
        <Button
          onClick={handleTrigger}
          isDisabled={disabled || isLoading}
          variant={config.buttonVariant}
        >
          {triggerLabel}
        </Button>
      </div>
    )
  }
)

Confirm.displayName = "Confirm"

export { Confirm }
