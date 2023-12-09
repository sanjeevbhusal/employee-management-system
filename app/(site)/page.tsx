import { getDepartments } from "../actions/getDepartments";
import { getUsers } from "../actions/getUsers";
import { DepartmentFilter } from "../components/DepartmentFilter";
import { SearchBar } from "../components/SearchBar";
import { Tag } from "../components/Tag";
import { UserCard } from "../components/UserCard";

interface HomeProps {
  params: {};
  searchParams: {
    query: string | undefined;
    department: string | undefined;
  };
}

export default async function Home({
  searchParams: { query, department },
}: HomeProps) {
  const users = await getUsers(
    query,
    department ? parseInt(department) : undefined,
  );
  const departments = await getDepartments();

  return (
    <div className="px-4 py-4 lg:px-20">
      <div>
        <SearchBar />
      </div>
      <DepartmentFilter departments={departments} />

      <div className="mt-4 flex gap-4">
        {query && <Tag type="query" name={query} />}
        {department && (
          <Tag
            type="department"
            name={
              departments.find((d) => d.id === parseInt(department))
                ?.name as string
            }
          />
        )}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
