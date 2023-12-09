import { getUsers } from "../actions/getUsers";
import { SearchBar } from "../components/SearchBar";
import { UserCard } from "../components/UserCard";

interface HomeProps {
  params: {};
  searchParams: {
    query: string;
  };
}

export default async function Home({ searchParams: { query } }: HomeProps) {
  const users = await getUsers(query);
  return (
    <div className="px-4 py-4 lg:px-20">
      <div>
        <SearchBar />
      </div>
      <div className="mt-12 flex gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
