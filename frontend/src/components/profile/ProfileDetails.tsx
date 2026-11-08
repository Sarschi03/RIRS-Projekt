import ProfileHeader from "./ProfileHeader";
import ProfileProjects from "./ProfileProjects";

export default function ProfileDetails() {
  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="profile-content-grid">
        <ProfileProjects />
      </div>
    </div>
  );
}
