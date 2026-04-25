import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import type { AllProductsInfo, UpdateProductsInfo } from "@/types/admin/products.types";
import { useForm } from "react-hook-form";
import { useAdminAddProduct, useAdminUpdateProduct } from "@/hooks/admin/products.hooks";

type Props = {
      modalType: 'add' | 'update';
      payload?: AllProductsInfo;
      open: boolean;
      onClose: () => void;
}

// For your modal form
type FormData = AllProductsInfo | UpdateProductsInfo;

const categories = ['Steamed', 'Fried', 'Oven', 'Bread'];

export default function ProductModal({ open, onClose, modalType, payload }: Props) {

      const { register, handleSubmit, setValue, watch, formState: { dirtyFields } } = useForm<AllProductsInfo>({
            defaultValues: {
                  product_id: modalType === 'update' ? payload?.product_id : 0,
                  name: modalType === 'update' ? payload?.name : '',
                  description: modalType === 'update' ? payload?.description : '',
                  image_url: modalType === 'update' ? payload?.image_url : '',
                  price: modalType === 'update' ? payload?.price : 0,
                  category: modalType === 'update' ? payload?.category : '',
                  steps: modalType === 'update' ? payload?.steps : [],
                  ingredients: modalType === 'update' ? payload?.ingredients : []
            }
      });

      const { mutate: addProduct } = useAdminAddProduct();
      const { mutate: updateProduct } = useAdminUpdateProduct();

      const ingredients = watch("ingredients");
      const steps = watch("steps");
      const image = watch("image_url");
      
      const handleIngredientChange = (index: number, value: string) => {
            const updated = [...ingredients];
            updated[index] = value;
            setValue("ingredients", updated);
      };
      
      const addIngredient = () => {
            setValue("ingredients", [...ingredients, ""]);
      };
      
      const removeIngredient = (index: number) => {
            setValue("ingredients", ingredients.filter((_, i) => i !== index));
      };

      const handleStepChange = (index: number, value: string) => {
            const updated = [...steps];
            updated[index] = value;
            setValue("steps", updated);
      };
      
      const addStep = () => {
            setValue("steps", [...steps, ""]);
      };
      
      const removeStep = (index: number) => {
            setValue("steps", steps.filter((_, i) => i !== index));
      };

      const onSubmit = (data: FormData) => {

            if (modalType === "add") {
                  addProduct(data as AllProductsInfo);
            } else if (modalType === "update") {
                  const updatedData: UpdateProductsInfo = {
                        product_id: data.product_id,
                  };
                  
                  (Object.keys(dirtyFields) as (keyof UpdateProductsInfo)[]).forEach((key) => {
                        if (key !== "product_id") {
                              updatedData[key] = data[key] as any;
                        }
                  });

                  updateProduct({
                        product_id: data.product_id,
                        updated_data: updatedData,
                  });
            }

            onClose();
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                  // result is a Base64 string
                  const base64 = reader.result as string;
                  setValue("image_url", base64); // save in react-hook-form
            };
            reader.readAsDataURL(file);
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>     
                  <DialogContent className="max-w-2xl">
                        <DialogHeader>
                              <DialogTitle>
                                    {modalType === 'add' ? 'Add New Product' : 'Update Product Details' }
                              </DialogTitle>
                              <DialogDescription>
                                    {modalType === 'add' ? 
                                          'Fill out the form below to add a new product to your store.'
                                    : 
                                          'Update the product’s details and save the changes to your store.'
                                    }
                              </DialogDescription>
                        </DialogHeader>

                        {/* Product Form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="space-y-4 mt-4 max-h-150 px-1 overflow-y-auto">
                                    <div>
                                          <Label htmlFor="name">Product Name</Label>
                                          <Input {...register("name")} placeholder="Malungay Pandesal" />
                                    </div>

                                    <div>
                                          <Label htmlFor="description">Description</Label>
                                          <Textarea
                                                {...register("description")}
                                                placeholder="(e.g Classic Filipino bread roll with a light crunchy crumb coating)"
                                          />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                          <div>
                                                <Label htmlFor="price">Price</Label>
                                                <Input {...register("price")} placeholder="2.00"/>
                                          </div>

                                          <div>
                                                <Label htmlFor="category">Category</Label>
                                                <Select value={watch("category")} onValueChange={(e) => setValue("category", e)}>
                                                      <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            {categories.map((cat) => (
                                                                  <SelectItem key={cat} value={cat}>
                                                                  {cat}
                                                                  </SelectItem>
                                                            ))}
                                                      </SelectContent>
                                                </Select>
                                          </div>
                                    </div>

                                    { /* Image */}
                                    <div>
                                          <Label htmlFor="image">Image</Label>

                                          <Input
                                                id="image"  
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(e)}
                                          />
                                          <div className="mt-1 flex flex-col gap-2">
                                                {/* Preview */}
                                                {image && typeof image === "string" && (
                                                      <img src={image} className="w-32 h-32 object-cover" />
                                                )}

                                                {/* Custom Upload Button */}
                                                <label htmlFor="image" className="cursor-pointer px-4 py-2 bg-amber-500 text-white font-medium rounded-md shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 text-center transition flex items-center justify-center gap-2">
                                                      <Plus/>
                                                      {image ? "Change Image" : "Upload Image"}
                                                </label>

                                          </div>
                                    </div>

                                    {/* Ingredients */}
                                    <div>
                                          <Label>Ingredients</Label>
                                          <div className="space-y-2">
                                                {ingredients.map((ingredient, index) => (
                                                      <div key={index} className="flex gap-2">
                                                            <Input
                                                                  value={ingredient}
                                                                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                                                                  placeholder={`Ingredient ${index + 1}`}
                                                            />
                                                            <Button className={`bg-red-500 text-white text-xs hover:bg-red-600`} onClick={() => removeIngredient(index)}>
                                                                  <Trash2/>
                                                            </Button>
                                                      </div>
                                                ))}
                                                <Button type="button" className="text-xs" onClick={addIngredient}>
                                                      + Add Ingredient
                                                </Button>
                                          </div>
                                    </div>

                                    {/* Steps */}
                                    <div>
                                          <Label>Steps</Label>
                                          <div className="space-y-2">
                                                {steps.map((step, index) => (
                                                      <div key={index} className="flex gap-2">
                                                            <Textarea
                                                                  value={step}
                                                                  onChange={(e) => handleStepChange(index, e.target.value)}
                                                                  placeholder={`Step ${index + 1}`}
                                                            />
                                                            <Button type="button" className={`bg-red-500 text-white text-xs hover:bg-red-600`} onClick={() => removeStep(index)}>
                                                                  <Trash2/>
                                                            </Button>
                                                      </div>
                                                ))}
                                                <Button type="button" className={` text-white text-xs `} onClick={addStep}>+ Add Step</Button>
                                          </div>
                                    </div>
                              </div>

                              <DialogFooter>
                                    <Button type="submit">
                                          {modalType === 'add' ? 'Add Product' : 'Update Product'}
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      );
}