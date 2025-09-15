import { Popup } from '@/shared/ui/Popup/Popup';
import cls from './UserProfile.module.scss';
import { FC } from 'react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onLogout: () => void;
}

const UserProfile: FC<UserProfileProps> = ({ user, isOpen, onClose, onEdit, onLogout }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className={cls.userProfile}>
        {/* Аватар */}
        <div className={cls.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className={cls.avatarPlaceholder}>{user.name?.charAt(0).toUpperCase()}</div>
          )}
        </div>

        {/* Информация */}
        <div className={cls.info}>
          <h3 className={cls.name}>{user.name}</h3>
          <p className={cls.email}>{user.email}</p>
        </div>

        {/* Действия */}
        <div className={cls.actions}>
          <button onClick={onEdit} className={cls.editBtn}>
            Редактировать
          </button>
          <button onClick={onLogout} className={cls.logoutBtn}>
            Выйти
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default UserProfile;
