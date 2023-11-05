import { ApiKeyForm } from "@/components/app/ApiKeyForm";
import { Container } from "@/components/app/Container";
import { UserProfileForm } from "@/components/app/UserProfileForm";

export default async function ProfilePage() {
  return (
    <main className="h-full py-8">
      <Container>
        {/* <StopsForm /> */}
        <UserProfileForm />
        <ApiKeyForm />
      </Container>
    </main>
  );
}
