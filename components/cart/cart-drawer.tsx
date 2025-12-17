"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getTotalItems } = useCartStore()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-lg font-semibold text-gray-900">
                  Carrinho ({getTotalItems()})
                </h2>
              </div>
              <Dialog.Close asChild>
                <button className="rounded-full p-1 hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-gray-900">
                    Carrinho vazio
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Adicione produtos ao seu carrinho
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const finalPrice = item.product.discount
                      ? item.product.price * (1 - item.product.discount / 100)
                      : item.product.price

                    return (
                      <div
                        key={item.product.id}
                        className="flex gap-4 rounded-lg border border-gray-200 p-4"
                      >
                        {/* Image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-gray-100">
                          {item.product.images[0] ? (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-beige">
                              <span className="font-heading text-xl text-gold">GO</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col">
                          <h3 className="font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          {item.customization && (
                            <p className="mt-1 text-xs text-gray-500">
                              Personalização: {item.customization}
                            </p>
                          )}
                          <p className="mt-1 font-semibold text-gold">
                            {formatCurrency(finalPrice)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="rounded border border-gray-300 p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="rounded border border-gray-300 p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium text-gray-900">Subtotal:</span>
                  <span className="font-heading text-2xl font-bold text-gold">
                    {formatCurrency(getSubtotal())}
                  </span>
                </div>
                <Link href="/checkout" onClick={() => onOpenChange(false)}>
                  <Button className="w-full" size="lg">
                    Finalizar Pedido
                  </Button>
                </Link>
                <p className="mt-2 text-center text-xs text-gray-600">
                  ou em até 12x de {formatCurrency(getSubtotal() / 12)} sem juros
                </p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
