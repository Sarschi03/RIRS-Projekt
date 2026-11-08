import { Camera, Mail } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Avatar } from "../common/UI";
import { useAuth } from "../../context/AuthContext";
import gradient from '../../assets/dashboard-gradient.png';

export default function ProfileHeader() {
  const { user, profileImage, setProfileImage } = useAuth();
  const input = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ userId: string; text: string; error: boolean } | null>(null);

  async function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!user) return;
    const showError = (text: string) => setFeedback({ userId: user.id, text, error: true });
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showError('Izberite sliko JPG, PNG ali WebP.'); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError('Slika je prevelika. Največja dovoljena velikost je 5 MB.'); return;
    }
    try {
      const image = await createImageBitmap(file);
      image.close();
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return;
        setProfileImage(reader.result);
        setFeedback({ userId: user.id, text: 'Profilna slika je izbrana.', error: false });
      };
      reader.onerror = () => showError('Slike ni mogoče prebrati. Poskusite z drugo datoteko.');
      reader.readAsDataURL(file);
    } catch { showError('Slike ni mogoče prebrati. Poskusite z drugo datoteko.'); }
  }
  if (!user) return null;
  return (
    <section className="profile-hero" aria-label="Vaš profil">
      <div className="profile-cover" aria-hidden="true"><img className="profile-cover-image" src={gradient} alt="" /></div>
      <div className="profile-identity">
        <div className="profile-photo-control">
          <button className="profile-hero-avatar profile-photo-button" type="button" aria-label="Naloži profilno sliko" title="Naloži profilno sliko" onClick={() => input.current?.click()}>
            {profileImage ? <img className="profile-photo" src={profileImage} alt={`Profilna slika: ${user.name}`} /> : <Avatar initials={user.initials} name={user.name} />}
            <span className="profile-photo-camera" aria-hidden="true"><Camera size={17} /></span>
          </button>
          <input ref={input} hidden type="file" accept="image/jpeg,image/png,image/webp" aria-label="Izberite profilno sliko" onChange={selectImage} />
        </div>
        <div className="profile-identity-text">
          <div className="profile-name">
            <h1>{user.name}</h1>
            <span className="profile-role">{user.roleLabel}</span>
          </div>
          <p>{user.jobTitle}</p>
          <span className="profile-email">
            <Mail size={14} />
            {user.email}
          </span>
          {feedback?.userId === user.id && <p className={`profile-photo-feedback${feedback.error ? ' is-error' : ''}`} role={feedback.error ? 'alert' : 'status'}>{feedback.text}</p>}
        </div>
      </div>
    </section>
  );
}
