export const getDefaultAvatar = (
  name: string = 'XX',
  userAvatarUrl: string = ''
) => {
  const userName: string = name;
  const nameWithoutSpaces = userName.replace(/\s+/g, '');
  const avatarUrl =
    userAvatarUrl ||
    `https://ui-avatars.com/api/?name=${nameWithoutSpaces}&background=1e1e1e&color=fff`;

  return avatarUrl;
};
