export class EventClass {
    Category: string = "";
    Date_time: Date = new Date();
    Downvote: number = 0;
    EventDescription: string = "";
    EventStatus: string = "";
    Event_time: Date = new Date();
    ID: number = 0;
    Severity: string = "";
    Title: string = "";
    Upvote: number = 0;
    UserID: number = 0;
    UserName: string = "";
    isVerified: number = 0;
}

export class Comment {
    userName: string = "";
    comment: string = "";
    upvotes: number = 0;
    downvotes: number = 0;
}

export class Helper {
    public static Deserialize(data: string): any {
        return JSON.parse(data, Helper.ReviveDateTime);
    }

    private static ReviveDateTime(key: any, value: any): any {
        if (typeof value === "string") {
            let a = /\/Date\((\d*)\)\//.exec(value);
            if (a) {
                return new Date(+a[1]);
            }
        }

        return value;
    }
}
