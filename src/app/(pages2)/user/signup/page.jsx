// page.js (Server Component)

import SignupForm from "./components/SignupForm";

export default function Page() {
  return (
    <div>
      {/* Server component rendering client-side SignupForm */}
      <SignupForm />
    </div>
  );
}
