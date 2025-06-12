import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";

type ProfileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Profile) => void;
  profileData: Profile | null;
  availableSkills?: string[];
  availableLocations?: string[];
};

type Profile = {
  fullName: string;
  bio: string;
  skills: string[];
  address: string;
};

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  profileData,
  availableSkills = [],
  availableLocations = [],
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultProfile: Profile = {
    fullName: "",
    bio: "",
    skills: [],
    address: "",
  };

  const [editedProfile, setEditedProfile] = useState<Profile>(profileData || defaultProfile);

  useEffect(() => {
    if (isOpen) {
      setEditedProfile(profileData || defaultProfile);
    }
  }, [defaultProfile, isOpen, profileData]);

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2>Edit Profile</h2>
        </DialogHeader>
        <div>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              value={editedProfile.fullName}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium">
              Skills
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {/* {editedProfile.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="cursor-pointer"
                  onClick={() =>
                    setEditedProfile((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((s) => s !== skill),
                    }))
                  }
                >
                  {skill} ✕
                </Badge>
              ))} */}
            </div>
            <Select
              onValueChange={(value) =>
                setEditedProfile((prev) => ({
                  ...prev,
                  skills: prev.skills.includes(value)
                    ? prev.skills
                    : [...prev.skills, value],
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Add a skill" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <Select
              onValueChange={(value) =>
                setEditedProfile((prev) => ({ ...prev, address: value }))
              }
              value={editedProfile.address}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an address" />
              </SelectTrigger>
              <SelectContent>
                {availableLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
