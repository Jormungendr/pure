import { MockRequest } from '@delon/mock';

const list: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: 'Fenrisu1fr',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2019-09-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2019-09-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any) {
  const item = list.find(w => w.id === id);
  if (!item) return { msg: '无效用户信息' };
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const USERS = {
  '/user': (req: MockRequest) => genData(req.queryString),
  '/user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /user/:id': (req: MockRequest) => saveData(+req.params.id, req.body),
  '/user/current': {
    name: 'Fenrisu1fr',
    avatar: 'http://scp-wiki.wdfiles.com/local--files/scp-1715/imnotthere04__article.jpg',
    userid: '00000001',
    email: 'tzt953647107@live.com',
    signature: 'Shining Justice!',
    title: 'Senior Software Engineer',
    group: 'AllLink R&D Department',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '技术流',
      },
      {
        key: '2',
        label: '帅~',
      },
      {
        key: '3',
        label: '通吃',
      },
      {
        key: '4',
        label: '啥都干',
      },
      {
        key: '5',
        label: '牛逼',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: 'Beijing',
        key: '100000',
      },
      city: {
        label: 'Chaoyang',
        key: '100031',
      },
    },
    address: 'XX区XXX路 XX 号',
    phone: '+1 515 808 6987',
  },
  'POST /user/avatar': 'ok',
  'POST /login/account': (req: MockRequest) => {
    const data = req.body;
    if (!(data.userName === 'admin' || data.userName === 'user') || data.password !== 'lean.com') {
      return { msg: `Invalid username or password（admin/lean.com）` };
    }
    return {
      msg: 'ok',
      user: {
        token: '123456789',
        name: data.userName,
        email: `${data.userName}@qq.com`,
        id: 10000,
        time: +new Date(),
      },
    };
  },
  'POST /register': {
    msg: 'ok',
  },
};
