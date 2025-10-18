import { getServerSession } from "next-auth";
import { authOptions } from "./authOption";

export const getUserSession = await getServerSession(authOptions);

