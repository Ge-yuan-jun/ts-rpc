import { createRetmoteService, RPCKey } from 'ts-brpc/client'
import rpcCfg from '../ts-rpc.json'
import { RPCDemo, RPCDemoMeta } from './rpc-definition'

const rs = createRetmoteService<RPCDemo>({
  baseUrl: rpcCfg.client.apps.a,
  meta: RPCDemoMeta,
  agent: async ({ serviceName, methodName, args, meta }) => {
    const url = new URL(`//${rpcCfg.client.apps.a}/${serviceName}/${methodName}`, window.location.href)
    let body
    let method = 'Post'
    if (meta.decorators.includes('@Post()')) {
      body = JSON.stringify({ [RPCKey.Args]: args })
    } else {
      method = 'Get'
      url.searchParams.set(RPCKey.Args, JSON.stringify(args))
    }

    const res = await window.fetch(url.href, {
      method,
      headers: {
        'content-type': 'application/json'
      },
      body
    })
    return (await res.json())[RPCKey.Return]
  }
})

document.getElementById('send')?.addEventListener('click', () => {
  ; (async () => {
    const userInfo = await rs.User.getInfoById('111')
    ;(document.getElementById('result') as HTMLDivElement).textContent = JSON.stringify(userInfo, null, 2)
  })().catch((err) => console.error(err))
})
