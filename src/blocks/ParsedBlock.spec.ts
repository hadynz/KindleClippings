import { EntryType, ParsedBlock, parseToUtcDate, Range } from './ParsedBlock';
import { RawBlock } from './RawBlock';

interface TestData {
  entry: RawBlock;
  title: string;
  author?: string;
  page?: Range;
  location?: Range;
  type: EntryType;
}

const textFixtures: TestData[] = [
  {
    entry: new RawBlock(
      'The Effective Manager (Horstman, Mark)',
      '- Your Highlight on page ix | location 247-248 | Added on Sunday, 18 February 2018 22:30:47',
      "It's about getting the most out of your direct reports,"
    ),
    title: 'The Effective Manager',
    author: 'Horstman, Mark',
    page: { display: 'ix' },
    location: { display: '247', from: 247, to: 248 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '非オタの彼女が俺の持ってるエロゲに興味津々なんだが…… (滝沢　慧;睦茸)',
      '- La subrayado en la página 197 | posición 2031-2035 | Añadido el sábado, 12 de octubre de 2019 0:37:31',
      'この部室は内側から施錠できるし、覗き窓みたいなものもない。'
    ),
    title: '非オタの彼女が俺の持ってるエロゲに興味津々なんだが……',
    author: '滝沢　慧;睦茸',
    page: { display: '197', from: 197, to: 197 },
    location: { display: '2031', from: 2031, to: 2035 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '僕が七不思議になったわけ (メディアワークス文庫) (小川 晴央)',
      '- La subrayado en la página 14 | posición 182-183 | Añadido el lunes, 25 de noviembre de 2019 0:43:38',
      '彼女は椅子から立ち上がると、落ち葉の様なスピードでゆっくりと床に降りた。着地の際に足元の埃が舞うだけで、音は一切しない。'
    ),
    title: '僕が七不思議になったわけ (メディアワークス文庫)',
    author: '小川 晴央',
    page: { display: '14', from: 14, to: 14 },
    location: { display: '182', from: 182, to: 183 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Ｃｈａｏｓ；Ｃｈｉｌｄ　－Ｃｈｉｌｄｒｅｎ’ｓ　Ｒｅｖｉｖｅ－ (講談社ラノベ文庫) (ＭＡＧＥＳ．;Ｃｈｉｙｏ ｓｔ．ｉｎｃ;梅原英司)',
      '- Your Highlight on Location 35-36 | Added on Monday, July 20, 2020 12:58:07 AM',
      '軟禁状態であったことは事実なのだから、おそらく外の人間からすれば、人権を無視された酷い生活に見えたのだろう。'
    ),
    title:
      'Ｃｈａｏｓ；Ｃｈｉｌｄ　－Ｃｈｉｌｄｒｅｎ’ｓ　Ｒｅｖｉｖｅ－ (講談社ラノベ文庫)',
    author: 'ＭＡＧＥＳ．;Ｃｈｉｙｏ ｓｔ．ｉｎｃ;梅原英司',
    location: { display: '35', from: 35, to: 36 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Le Retour du roi (J.R.R. Tolkien)',
      '- Votre surlignement sur la page 200 | emplacement 3054-3056 | Ajouté le mercredi 16 août 2017 02:14:10',
      'Il ne nous appartient toutefois pas de rassembler toutes les marées du monde, mais de faire ce qui est en nous pour le secours des années dans lesquelles nous sommes placés, déracinant le mal dans les champs que nous connaissons, de sorte que ceux qui vivront après nous puissent avoir une terre propre à cultiver.'
    ),
    title: 'Le Retour du roi',
    author: 'J.R.R. Tolkien',
    page: { display: '200', from: 200, to: 200 },
    location: { display: '3054', from: 3054, to: 3056 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'The Effective Manager (Horstman, Mark)',
      '- Your Highlight on page ix | location 247-248 | Added on Sunday, 18 February 2018 22:30:47',
      "It's about getting the most out of your direct reports,"
    ),
    title: 'The Effective Manager',
    author: 'Horstman, Mark',
    page: { display: 'ix' },
    location: { display: '247', from: 247, to: 248 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'paulo-coehlo-the-devil-and-miss-prym  ',
      '- Your Highlight on page 14-14 | Added on Saturday, 23 December 2017 09:46:53',
      "Given the right circumstances, every human being on this earth would be willing to commit evil.'"
    ),
    title: 'paulo-coehlo-the-devil-and-miss-prym',
    page: { display: '14', from: 14, to: 14 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '如何使用 Knotes',
      '- 您在第 3 页（位置 #1-1）的标注 | 添加于 2017年11月13日星期一 上午9:00:00',
      '📖 功能栏位于左上方'
    ),
    title: '如何使用 Knotes',
    page: { display: '3', from: 3, to: 3 },
    location: { display: '1', from: 1, to: 1 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      "The Bogleheads' Guide to Investing - Taylor Larimore.pdf",
      '- Your Highlight on page xvi-xvi | Added on Monday, April 18, 2016 7:28:27 AM',
      'our financial markets are essentially closed systems in which an advantage garnered by a given investor comes at the disadvantage of the other investors in the same market'
    ),
    title: "The Bogleheads' Guide to Investing - Taylor Larimore.pdf",
    page: { display: 'xvi' },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Garota exemplar (Flynn, Gillian)',
      '- Seu destaque ou posição 2829-2829 | Adicionado: sexta-feira, 29 de novembro de 2019 18:00:13',
      'Na verdade, queria que ela lesse minha mente para eu não ter de me rebaixar à arte feminina da articulação.'
    ),
    title: 'Garota exemplar',
    author: 'Flynn, Gillian',
    location: { display: '2829', from: 2829, to: 2829 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Your Money or Your Life (Vicki Robin)',
      '-  La tua evidenziazione alla posizione 453-454 | Aggiunto in data lunedì 8 marzo 2021 22:52:57',
      'There is a way to approach life so that when asked, “Your money or your life?” you say, “I’ll take both, thank you.”'
    ),
    title: 'Your Money or Your Life',
    author: 'Vicki Robin',
    location: { display: '453', from: 453, to: 454 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Outliers (Gladwell, Malcolm)',
      '- Your Note at location 1971 | Added on Wednesday, 6 January 2021 14:22:58',
      'Airplane Accidents - also how software projects go wrong'
    ),
    title: 'Outliers',
    author: 'Gladwell, Malcolm',
    location: { display: '1971', from: 1971, to: 1971 },
    type: 'NOTE',
  },
  {
    entry: new RawBlock(
      'The Effective Manager (Horstman, Mark)',
      '- Your Bookmark on page 136 | location 2543 | Added on Monday, 26 February 2018 11:00:31',
      ''
    ),
    title: 'The Effective Manager',
    author: 'Horstman, Mark',
    page: { display: '136', from: 136, to: 136 },
    location: { display: '2543', from: 2543, to: 2543 },
    type: 'BOOKMARK',
  },
  {
    entry: new RawBlock(
      'Your P2K Articles (2021-04-02) (P2K)',
      '-  La tua evidenziazione alla posizione 72-73 | Aggiunto in data lunedì 5 aprile 2021 23:14:27',
      'You likely have a long list of things you want to accomplish in life. But when everything is a priority, nothing is a priority.'
    ),
    title: 'Your P2K Articles (2021-04-02)',
    author: 'P2K',
    location: { display: '72', from: 72, to: 73 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'The Big Book of Science Fiction',
      '- Your Highlight on page 1 | Location 755-756 | Added on Monday, October 19, 2020 7:32:56 PM',
      'Wells found such stunts from his rival annoying and was less interested in whether a mecha-elephant could actually clomp and clank across the earth'
    ),
    title: 'The Big Book of Science Fiction',
    page: { display: '1', from: 1, to: 1 },
    location: { display: '755', from: 755, to: 756 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'Oreilly.Developing.Backbone.js.Applications.Apr.2012 (Addy Osmani)',
      '- Highlight on Page 10 | Added on Monday, 3 December 12 19:51:33 Greenwich Mean Time',
      'Some highlight content...'
    ),
    title: 'Oreilly.Developing.Backbone.js.Applications.Apr.2012',
    author: 'Addy Osmani',
    page: { display: '10', from: 10, to: 10 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '飘（上下） (外国文学名著名译丛书) ((美)米切尔)',
      '- 您在位置 #2543-2544的标注 | 添加于 2023年2月9日星期四 下午6:35:21',
      '梅拉妮才十八岁，怎么就甘心成天守在家里，不去找点儿乐趣，宁愿为哥哥披黑纱守丧？'
    ),
    title: '飘（上下） (外国文学名著名译丛书)',
    author: '(美)米切尔',
    location: { display: '2543', from: 2543, to: 2544 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '苏东坡传（林语堂独家授权作品）（新东方董老师推荐！3天破10万！中国经典历史传记必读！） (博集文学典藏系列) (林语堂)',
      '- 您在第 25 页（位置 #243-244）的标注 | 添加于 2023年2月14日星期二 上午5:15:57',
      '人生是如同戏剧，但是在人生的戏剧里，最富有智慧与最精明的伶人，对于下一幕的大事如何，也是茫然无知。'
    ),
    title:
      '苏东坡传（林语堂独家授权作品）（新东方董老师推荐！3天破10万！中国经典历史传记必读！） (博集文学典藏系列)',
    author: '林语堂',
    page: { display: '25', from: 25, to: 25 },
    location: { display: '243', from: 243, to: 244 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      '飘（上下） (外国文学名著名译丛书) ((美)米切尔)',
      '- 您在位置 #2544 的笔记 | 添加于 2023年2月9日星期四 下午6:36:38',
      '原来是为她哥哥守孝,到这里才说明白。'
    ),
    title: '飘（上下） (外国文学名著名译丛书)',
    author: '(美)米切尔',
    location: { display: '2544', from: 2544, to: 2544 },
    type: 'NOTE',
  },
  {
    entry: new RawBlock(
      'Рождение сложности. Эволюционная биология сегодня: неожиданные открытия и новые вопросы (Александр Владимирович Марков)',
      '– Ваш выделенный отрывок в месте 904–905 | Добавлено: понедельник, 24 июля 2023 г. в 15:44:52',
      'жизнь в основе своей – это самоподдерживающийся, автокаталитический процесс.'
    ),
    title:
      'Рождение сложности. Эволюционная биология сегодня: неожиданные открытия и новые вопросы',
    author: 'Александр Владимирович Марков',
    location: { display: '904', from: 904, to: 905 },
    type: 'HIGHLIGHT',
  },
  {
    entry: new RawBlock(
      'vasilij_vasilevich_kandinskij_o_ (Василий Васильевич Кандинский)',
      '– Ваша заметка в месте 4264 | Добавлено: понедельник, 17 июля 2023 г. в 8:38:11',
      'Но в цветовом пространстве'
    ),
    title: 'vasilij_vasilevich_kandinskij_o_',
    author: 'Василий Васильевич Кандинский',
    location: { display: '4264', from: 4264, to: 4264 },
    type: 'NOTE',
  },
  {
    entry: new RawBlock(
      'Берлинский дневник. Европа накануне Второй мировой войны глазами американского корреспондента (Уильям Лоуренс Ширер)',
      '– Ваша закладка в месте 2712 | Добавлено: пятница, 12 августа 2022 г. в 12:48:17',
      ''
    ),
    title: 'Берлинский дневник. Европа накануне Второй мировой войны глазами американского корреспондента',
    author: 'Уильям Лоуренс Ширер',
    location: { display: '2712', from: 2712, to: 2712 },
    type: 'BOOKMARK',
  },
  
  
  {
    entry: new RawBlock(
      'Using Fragments in Android (Lars Vogel)',
      '- Meine Notiz auf Seite 11 | Position 161 | Hinzugefügt am Dienstag, 26. November 2013 um 19:56:11 Uhr',
      'Improved interface implementation check.'
    ),
    title: 'Using Fragments in Android',
    author: 'Lars Vogel',
    page: { display: '11', from: 11, to: 11 },
    location: { display: '161', from: 161, to: 161 },
    type: 'NOTE',
  },
  {
    entry: new RawBlock(
      'Using Fragments in Android (Lars Vogel)',
      '- Meine Markierung auf Seite 11 | Position 155-161 | Hinzugefügt am Dienstag, 26. November 2013 um 19:56:11 Uhr',
      '    if (activity instanceof OnItemSelectedListener) {       listener = (OnItemSelectedListener) activity;     } else {       throw new ClassCastException(activity.toString()           + " must implemenet MyListFragment.OnItemSelectedListener");     }'
    ),
    title: 'Using Fragments in Android',
    author: 'Lars Vogel',
    page: { display: '11', from: 11, to: 11 },
    location: { display: '161', from: 155, to: 161 },
    type: 'HIGHLIGHT',
  },

];

describe('ParsedBlock', () => {
  const t = textFixtures.map((entry) =>
    Object.assign(entry, {
      toString: () => {
        return entry.title;
      },
    })
  );

  test.each(t)("Parse Parsed Block entry '%s'", (expected: TestData) => {
    const actual = new ParsedBlock(expected.entry);

    expect(actual.title).toEqual(expected.title);
    expect(actual.authors).toEqual(expected.author);
    expect(actual.page).toEqual(expected.page);
    expect(actual.location).toEqual(expected.location);
    expect(actual.type).toEqual(expected.type);
  });
});

describe('parseDateOfCreation', () => {
  test.each([
    [
      'Added on Monday, April 18, 2016 7:28:27 AM',
      new Date('2016-04-18T07:28:27Z'),
    ],
    [
      'Añadido el sábado, 12 de octubre de 2019 0:37:31', // Spanish
      new Date('2019-10-12T00:37:31Z'),
    ],
    [
      'Ajouté le mercredi 16 août 2017 02:14:10', // French
      new Date('2017-08-16T02:14:10Z'),
    ],
    [
      'Adicionado: sexta-feira, 29 de novembro de 2019 18:00:13', // Portuguese
      new Date('2019-11-29T18:00:13Z'),
    ],
    [
      'Aggiunto in data lunedì 8 marzo 2021 22:52:57', // Italian
      new Date('2021-03-08T22:52:57Z'),
    ],
    ['Invalid date', undefined],
    ['', undefined],
  ])(
    'Formats "%s" as "%o"',
    (dateString: string, expected: Date | undefined) => {
      const actual = parseToUtcDate(dateString);
      expect(actual).toEqual(expected);
    }
  );
});
