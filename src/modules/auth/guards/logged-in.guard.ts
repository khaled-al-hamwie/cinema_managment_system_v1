import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { NotLoggedInException } from "../exceptions/not-logged-in.exception";

@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        if (context.switchToHttp().getRequest().isAuthenticated()) return true;
        else throw new NotLoggedInException();
    }
}
