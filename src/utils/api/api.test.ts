import { getTransferPayee } from './api';

test('should correctly get the transfer payee', async ()=> {
  expect(await getTransferPayee('venmo-account-id')).toBe('venmo-transfer-id')
  
})