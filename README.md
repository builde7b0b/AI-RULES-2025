Feature Flag Toggle (Example) 
```
// src/application/flags.ts
export const flags = {
  newFeatureX: false,
};

```

Port + Adapter Example 
```
// src/application/ports/UserRepo.ts
export interface UserRepo {
  getById(id: string): Promise<User>;
}

// src/infrastructure/db/UserRepoPg.ts
import { UserRepo } from "../../application/ports/UserRepo";
export class UserRepoPg implements UserRepo { /* ... */ }

// src/application/services/GetUser.ts
import type { UserRepo } from "../ports/UserRepo";
export const getUser = (repo: UserRepo) => (id: string) => repo.getById(id);
```
