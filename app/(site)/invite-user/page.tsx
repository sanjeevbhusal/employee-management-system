"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Invitation, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(1, "This field is required").email("Invalid email"),
  role: z.string().min(1, "This field is required"),
});

interface InvitationWithInvitedByUser extends Invitation {
  invitedByUser: User;
}

export default function InviteUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
  const [invitations, setInvitations] = useState<InvitationWithInvitedByUser[]>(
    [],
  );

  useEffect(() => {
    async function getInvitations() {
      setIsLoadingInvitations(true);
      try {
        const response = await axios.get("/api/user/invite");
        const { invitations } = response.data;
        console.log(invitations);
        setInvitations(invitations);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingInvitations(false);
      }
    }

    getInvitations();
  }, []);

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
    <div className="min-h-screen px-4 pb-4 lg:px-20">
      <div className="h-full border border-t-0 ">
        <div className="m-auto w-[700px] px-8 py-8">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="p-4">
              <h1 className="pt-4 text-base font-semibold leading-7 text-gray-900">
                Invite a user to the organization
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                The user will receive a email with a link. Upon clicking the
                link, the user will be redirected to fill a form. Upon
                completion of the form,the account will be successfully created
                and the user can log in.{" "}
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
          <div className="bg-re-500 -mx-20 border-b border-gray-900/10 pb-12">
            <div className="p-4 py-12">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                Invited Users
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                These are all the users that your organization has ever invited.
                You can view the assigned email, assigned role and the user who
                invited them.
                {/* You can sort the table in ascending or descending order based
                upon a column, search for a user, etc. */}
              </p>
              <Table className="mt-8">
                <TableHeader>
                  <TableRow>
                    <TableHead>Assigned Email</TableHead>
                    <TableHead>Assigned Role</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Invited Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>{invitation.email}</TableCell>
                      <TableCell>{invitation.role}</TableCell>
                      <TableCell>
                        <Link href={`users/${invitation.invitedByUser.id}`}>
                          <Image
                            src={invitation.invitedByUser.image as string}
                            alt={`Image for ${invitation.invitedByUser.name}`}
                            height={32}
                            width={32}
                            className="inline cursor-pointer rounded-full"
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        {new Date(invitation.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {isLoadingInvitations && (
                <div className="mt-8 text-center">
                  <Loader2 className="m-auto animate-spin" size={32} />
                </div>
              )}
              {!isLoadingInvitations && invitations.length === 0 ? (
                <p className="mt-8 text-center text-sm leading-6 text-gray-600">
                  No invitations have been sent yet.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
