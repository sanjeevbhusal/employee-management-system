"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1, "This field is required").email("Invalid email"),
  role: z.string().min(1, "This field is required"),
});

export default function InviteUser() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await axios.post("/api/user/invite", {
        ...values,
      });
      form.reset();
      toast({
        description: "Invitation sent successfully",
        className: "bg-blue-500 text-white",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen px-4 pb-4 lg:px-20">
      <div className="h-full border border-t-0 ">
        <div className="m-auto w-[700px] px-8 py-8">
          <div className="p-4">
            <h1 className="pt-4 text-base font-semibold leading-7 text-gray-900">
              Invite a user to the organization
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              The user will receive a email with a link. Upon clicking the link,
              the user will be redirected to fill a form. Upon completion of the
              form,the account will be successfully created and the user can log
              in.{" "}
            </p>
          </div>

          <Form {...form}>
            <form
              className="mt-10 w-[26rem] space-y-12 overflow-hidden px-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">
                      Employee Email
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">
                      Employee Role
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-96" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="ml-auto flex"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
