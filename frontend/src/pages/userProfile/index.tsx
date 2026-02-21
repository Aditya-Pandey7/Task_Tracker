import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store";
import { useState } from "react";
// import ArrowButton from "@/components/ArrowButton";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <section className="h-full">
      {/* Back Arrow */}
      <div className="max-w-3xl mx-auto mb-6">
        {/* <ArrowButton to="/" /> */}
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10 space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 rounded-full overflow-hidden ">
            <img
              src={"https://i.pravatar.cc/150?img=3"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {isEditing && <input type="file" className="text-sm text-gray-500" />}

          <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <Input
              defaultValue={user?.username}
              disabled={!isEditing}
              className="h-11 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <Input
              defaultValue={user?.email}
              disabled={!isEditing}
              className="h-11 rounded-lg"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
