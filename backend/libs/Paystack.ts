import axios from "axios";
import { env } from "../configs/env";

class Paystack {
  static find(ref: string) {
    return new Promise((resolve) => {
      axios
        .get(`https://api.paystack.co/transaction/verify/${ref}`, {
          headers: { Authorization: `Bearer ${env.PAYSTACK_PRIVATE_KEY}` }
        })
        .then((d) => d.data)
        .then((json: any) => {
          console.log("Line: 12, Paystack.ts", json);
          return json && json.status ? resolve(json.data) : resolve(null);
        })
        .catch(() => resolve(null));
    });
  }

  static getOrderId(ref: string) {
    return ref.split("_-_")[0];
  }
}

export = Paystack;
