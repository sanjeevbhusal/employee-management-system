import { getDepartments } from "../../actions/getDepartments";
import { getRoles } from "../../actions/getRoles";
import { getUsers } from "../../actions/getUsers";
import { DepartmentFilter } from "../../components/DepartmentFilter";
import { GenderFilter } from "../../components/GenderFilter";
import { Pagination } from "../../components/Pagination";
import { RoleFilter } from "../../components/RoleFitler";
import { SearchBar } from "../../components/SearchBar";
import { Tag } from "../../components/Tag";
import { UserCard } from "../../components/UserCard";

interface HomeProps {
  params: {};
  searchParams: {
    query: string | undefined;
    department: string | undefined;
    gender: string | undefined;
    role: string | undefined;
    page: string | undefined;
  };
}

export default async function Home({
  searchParams: { query, department, gender, role, page },
}: HomeProps) {
  const { totalMatches, users } = await getUsers(
    query,
    department ? parseInt(department) : undefined,
    gender,
    role,
    page ? parseInt(page) : 1,
  );
  const departments = await getDepartments();
  const roles = await getRoles();

  return (
    <div className="px-4 py-4 lg:px-20">
      <div>
        <SearchBar />
      </div>
      <div className="flex gap-4">
        <DepartmentFilter departments={departments} />
        <RoleFilter roles={roles} />
        <GenderFilter />
      </div>

      <Pagination totalUsers={totalMatches} />
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
        {gender && <Tag type="gender" name={gender} />}
        {role && <Tag type="role" name={role} />}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
