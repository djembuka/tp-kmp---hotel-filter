window.hotelFilterScripts = ['url1.js', 'url2.js'];

window.hotelFilterStore = {
  fetchUrl: {
    hotelRoomsGallery: '/response.json',
    filterData: '/filter.json?id=567',
  },
  days: ['ночь', 'ночи', 'ночей'],
  items: [
    {
      type: 'calendar',
      param: 'PARAM1',
      title: 'ЗАЕЗД',
      data: {
        availableDates: null /*[
          { start: 1639489200000, end: 1640268685791 },
          { start: 1639836696555, end: 1640700705083 },
        ]*/,
        minDate: 1639489200000, //null,
        range: {
          start: 1639489200000,
          end: 1639836696555,
        },
      },
    },
    {
      type: 'period',
      param: 'PARAM2',
      title: 'КОЛИЧЕСТВО ночей',
      data: [
        {
          id: '1',
          days: 1,
        },
        {
          id: '2',
          days: 2,
        },
        {
          id: '3',
          days: 5,
        },
      ],
    },
    {
      type: 'meal',
      param: 'PARAM3',
      title: 'ТИП ПИТАНИЯ',
      data: [
        {
          id: '1',
          name: 'RO (Room only)',
        },
        {
          id: '2',
          name: 'EP (European Plan)',
        },
        {
          id: '3',
          name: 'BB (Bed & breakfast)',
          selected: true,
        },
        {
          id: '4',
          name: 'HB (Half board)',
        },
        {
          id: '5',
          name: 'FB (Full board)',
          selected: true,
        },
      ],
    },
    {
      type: 'room',
      param: 'PARAM4',
      title: 'ТИП НОМЕРА',
      data: [
        {
          id: '6',
          name: 'SGL (Single)',
        },
        {
          id: '7',
          name: 'DBL (Double)',
        },
        {
          id: '8',
          name: 'TRPL (Triple)',
          selected: true,
        },
        {
          id: '9',
          name: 'QDPL (Quadriple)',
        },
        {
          id: '10',
          name: 'ExB (Extra Bed)',
        },
      ],
    },
  ],
  button: {
    send: 'Посмотреть цены',
    scroll: 'Оставить заявку',
  },
};
