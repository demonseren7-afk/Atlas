import { mockUserProfile } from "../../lib/mockUserProfile";

const profileRows = [
  ["Age", mockUserProfile.age],
  ["Gender", mockUserProfile.gender],
  ["Height", `${mockUserProfile.height} cm`],
  ["Weight", `${mockUserProfile.weight} kg`],
  ["Goal", mockUserProfile.goal],
  ["Experience", mockUserProfile.experience_level],
  ["Training time", mockUserProfile.training_time],
  ["Recovery", mockUserProfile.recovery_status]
];

export default function OnboardingPage() {
  return (
    <main>
      <h1 className="page-title">Onboarding</h1>
      <p className="page-copy">Mock user profile for the Atlas MVP.</p>
      <section className="panel">
        <div className="grid">
          {profileRows.map(([label, value]) => (
            <div key={label}>
              <strong>{label}:</strong> {value}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
