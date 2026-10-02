export type User = { id:string; name:string; avatar:string; level:number; coins:number; diamonds:number; followers:number; following:number; bio:string; verified?:boolean; city?:string; gender?:string; };
export type Room = { id:string; title:string; host:User; type:string; city:string; usersCount:number; mics:(User|null)[]; };
export type Gift = { id:string; name:string; icon:string; price:number; };
export type ChatMsg = { user:string; text:string; time:string; };
