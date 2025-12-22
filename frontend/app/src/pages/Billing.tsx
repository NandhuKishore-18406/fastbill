import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Minus, X, FileText, Check, Download, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface BillItem {
  product: Product;
  quantity: number;
}

// Categories for filtering
const categories = [
  { id: "all", label: "All Products" },
  { id: "peripherals", label: "Peripherals" },
  { id: "cables", label: "Cables" },
  { id: "accessories", label: "Accessories" },
  { id: "audio-video", label: "Audio/Video" },
];

// Mock products with categories
const availableProducts: Product[] = [
  { id: "1", name: "Wireless Mouse", price: 29.99, stock: 45, category: "peripherals" },
  { id: "2", name: "USB Cable Type-C", price: 12.99, stock: 8, category: "cables" },
  { id: "3", name: "Mechanical Keyboard", price: 89.99, stock: 23, category: "peripherals" },
  { id: "4", name: "Monitor Stand", price: 49.99, stock: 3, category: "accessories" },
  { id: "5", name: "HDMI Cable 2m", price: 14.99, stock: 67, category: "cables" },
  { id: "6", name: "Webcam HD", price: 79.99, stock: 12, category: "audio-video" },
  { id: "7", name: "USB Hub 4-Port", price: 24.99, stock: 5, category: "accessories" },
  { id: "8", name: "Laptop Stand", price: 39.99, stock: 18, category: "accessories" },
  { id: "9", name: "DisplayPort Cable", price: 18.99, stock: 34, category: "cables" },
  { id: "10", name: "Wireless Headset", price: 59.99, stock: 15, category: "audio-video" },
  { id: "11", name: "Mouse Pad XL", price: 19.99, stock: 52, category: "accessories" },
  { id: "12", name: "USB Microphone", price: 89.99, stock: 9, category: "audio-video" },
];

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [billGenerated, setBillGenerated] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const filteredProducts = availableProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToBill = (product: Product) => {
    const existing = billItems.find((item) => item.product.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setBillItems(
          billItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setBillItems([...billItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setBillItems(
      billItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > item.product.stock) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as BillItem[]
    );
  };

  const removeItem = (productId: string) => {
    setBillItems(billItems.filter((item) => item.product.id !== productId));
  };

  const total = billItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const generateBill = () => {
    const newInvoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    setInvoiceNumber(newInvoiceNumber);
    setBillGenerated(true);
    toast({
      title: "Bill Generated Successfully",
      description: `Invoice ${newInvoiceNumber} has been created.`,
    });
  };

  const startNewBill = () => {
    setBillItems([]);
    setBillGenerated(false);
    setInvoiceNumber("");
  };

  // Count products per category for badge
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return availableProducts.length;
    return availableProducts.filter(p => p.category === categoryId).length;
  };

  return (
    <AppLayout title="Billing">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-section-title">Select Products</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm">{filteredProducts.length} items</span>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={billGenerated}
              />
            </div>

            {/* Category Filter Bar */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  disabled={billGenerated}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                    "border border-border/60 disabled:opacity-50 disabled:cursor-not-allowed",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground hover:border-border"
                  )}
                >
                  {category.label}
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-md text-xs",
                    selectedCategory === category.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}>
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No products found in this category
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const inBill = billItems.find((item) => item.product.id === product.id);
                  return (
                    <button
                      key={product.id}
                      onClick={() => addToBill(product)}
                      disabled={billGenerated || product.stock === 0}
                      className={cn(
                        "p-4 border border-border/60 rounded-xl text-left transition-all duration-200",
                        "hover:bg-accent hover:border-primary/30 hover:shadow-soft",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        inBill && "border-primary bg-primary/5 shadow-soft"
                      )}
                    >
                      <p className="text-body font-medium truncate">{product.name}</p>
                      <p className="text-lg font-semibold text-foreground mt-1">${product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-md",
                          product.stock <= 5 
                            ? "bg-warning-muted text-warning-foreground" 
                            : "bg-secondary text-muted-foreground"
                        )}>
                          {product.stock} in stock
                        </span>
                        {inBill && (
                          <span className="text-xs text-primary font-semibold">
                            {inBill.quantity}×
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Bill Summary */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-section-title">Bill Summary</h2>
              {invoiceNumber && (
                <span className="text-xs text-muted-foreground">{invoiceNumber}</span>
              )}
            </div>

            {billGenerated ? (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bill Generated!</h3>
                <p className="text-secondary mb-6">
                  Invoice {invoiceNumber} created successfully
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={startNewBill} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    New Bill
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Bill Items */}
                <div className="space-y-3 max-h-[280px] overflow-y-auto mb-4">
                  {billItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No items added yet
                    </p>
                  ) : (
                    billItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="icon-button w-7 h-7 p-0 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="icon-button w-7 h-7 p-0 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="icon-button-danger w-7 h-7 p-0 flex items-center justify-center ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Generate Bill Button */}
                <Button
                  onClick={generateBill}
                  disabled={billItems.length === 0}
                  className="w-full h-12 text-base"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Bill
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
