export interface UserProps {
    id: string;
    email: string;
}

export class User {
  constructor(private props: UserProps) {
    if (!props.email) throw new Error("Email is required");
  }

  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }

  toJSON() {
    return {...this.props};
  }
}
