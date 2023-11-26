import { ApiKeyForm } from "@/components/common/ApiKeyForm";
import { Container } from "@/components/common/Container";
import { UserProfileForm } from "@/components/common/UserProfileForm";

export default async function ProfilePage() {
  return (
    <main className="h-full py-8">
      <Container>
        <UserProfileForm />
        <ApiKeyForm />
      </Container>
    </main>
  );
}
