import ShortUniqueId from 'short-unique-id';

export enum IdType {
  USER_ID,
  POST_ID,
  NOTIFICATION_ID,
  REACTION_ID,
  INFO_REQUEST,
}

export default function GenerateUniqueId(type: IdType): string {
  const uud = new ShortUniqueId();
  if (type == IdType.USER_ID) {
    return uud.rnd(20);
  }
  return uud.rnd(18);
}
