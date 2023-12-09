import { User } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
    <div className="basis-[350px]">
      <Link href={`/users/${user.id}`}>
        <Card className="bg-slate-50">
          <CardHeader>
            <div className="flex gap-4">
              <Image
                src={user.image as string}
                alt={`User Card for ${user.name}`}
                height={64}
                width={64}
                className="rounded-full"
              />
              <div>
                <p className="text-base font-semibold text-slate-900 ">
                  {user.name}
                </p>
                <p className="mt-2 text-sm text-gray-500">Software Enginner</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 tracking-wide text-neutral-600">
              Have been working with CSS for over ten years and Tailwind just
              makes my life easier. It is still CSS and you use flex, grid, etc.
              but just quicker to write and maintain.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export { UserCard };
