import { RPCMethod, RPCService } from 'ts-brpc/server'

interface UserInfo {
  name: string
  age: number
  avatar: string
}

interface Other {
  o: string
}

// 仅用于标记 Method，传递给 client
function Post () {
  return (
    target: Object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ) => {}
}

/**
 * service doc
 */
@RPCService()
export class User {
  /**
   * method doc
   */
  @Post()
  @RPCMethod()
  getInfoById (id: string): UserInfo {
    return { name: '22', age: 18, avatar: '' }
  }

  @RPCMethod()
  getUnreadMsg (id: string): string[] {
    return []
  }

  other (): Other {
    return {} as any
  }
}
