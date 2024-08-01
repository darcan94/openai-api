import { User } from "next-auth";
import Image from "next/image";

interface Props{
    user?: User | null;
}

export default function Avatar({ user }: Props){
 
    return user?.image 
            ? (
                <div className="z-10 flex -space-x-4 rtl-space-x-reverse">
                    <Image
                        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                        src={user?.image}
                        width={40}
                        height={40}
                        alt="Avatar" />
                </div>
                ) 
            : (
                <div className="text-white text-xl rounded-full z-10 h-10 w-10 flex justify-center items-center -space-x-4 rtl-space-x-reverse bg-primary">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
              )
            
}