"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { useSession } from "@/app/hooks/useSession";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  employeeName: z.string().min(1, "This field is required"),
  about: z.string().min(1, "This field is required"),
  photo: z.instanceof(File).refine((file) => {
    if (!file.name) return false;
    return true;
  }, "This field is required"),
  country: z.enum(["India", "Nepal"], {
    required_error: "This field is required",
  }),
  streetAddress: z.string().min(1, "This field is required"),
  city: z.string().min(1, "This field is required"),
  state: z.string().min(1, "This field is required"),
});

export default function Example() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      about: "",
      photo: new File([], ""),
      country: "Nepal",
      streetAddress: "",
      city: "",
      state: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const user = useSession();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/user", {
        name: values.employeeName,
        about: values.about,
        country: values.country,
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-4 pb-4 lg:px-20">
      <div className="border border-t-0">
        <Form {...form}>
          <form
            className="m-auto w-[700px] space-y-12 overflow-hidden px-8 py-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 space-y-8">
                <FormField
                  control={form.control}
                  name="employeeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">
                        Employee Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-96" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">About</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="w-full" />
                      </FormControl>
                      <FormDescription className="mt-3 text-gray-600">
                        Write a few sentences about yourself.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Photo</FormLabel>
                      <FormControl>
                        <Input
                          className="w-64"
                          accept=".jpg, .jpeg, .png"
                          type="file"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information cannot be seen by anyone except you and your
                company's HR.
              </p>

              <div className="mt-10 space-y-8">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-800">Country</FormLabel>
                      <FormControl>
                        {/* <Input {...field} className="w-96" /> */}
                        <Select
                          value={field.value}
                          name={field.name}
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent {...field}>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="Nepal">Nepal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem className="mt-10">
                      <FormLabel className="text-gray-800">
                        Street Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Street 123, near Hanuman Temple"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className=" text-gray-600">
                        The internal street name of your home's location. Be as
                        specific as possible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-16">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel className="text-gray-800">City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="grow">
                        <FormLabel className="text-gray-800">
                          State/Province
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="ml-auto flex" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
