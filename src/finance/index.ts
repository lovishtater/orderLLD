interface IFinanceService {}

interface IZohoService extends IFinanceService {}

class FinanceService implements IFinanceService {}

class ZohoService extends FinanceService implements IZohoService {}
