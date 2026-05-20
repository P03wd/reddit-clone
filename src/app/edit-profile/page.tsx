import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/currentUser";

import { updateProfile } from "@/actions/updateProfile";

export default async function EditProfilePage() {
  // Current logged in user
  const currentUser = await getCurrentUser();

  // Not logged in
  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Profile
      </h1>

      <form
        action={updateProfile}
        className="flex flex-col gap-4"
      >
        {/* Bio */}
        <textarea
          name="bio"
          defaultValue={currentUser.bio || ""}
          placeholder="Write your bio..."
          className="border p-3 rounded-lg h-40"
        />

        {/* Save Button */}
        <button className="bg-orange-500 text-white py-3 rounded-lg">
          Save Profile
        </button>
      </form>
    </div>
  );
}