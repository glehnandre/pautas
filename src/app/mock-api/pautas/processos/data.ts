import { Processo, SituacaoDoProcesso, TipoDoProcesso} from "app/modules/acervo/tabela/tabela.component";
import { tags as tagData } from 'app/mock-api/pautas/tags/data';

export const processo: Processo[] = [
  {
    id:         1,
    nome:     'Mérito',
    lista:      [
                  tagData[0],
                  tagData[1],
                ],
    classe:     'ADI',
    numero:     100,
    cadeira:    1,
    descricao:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl magna, pretium eu iaculis id, fringilla et leo. Vestibulum eget mi vitae velit sodales maximus. Proin non ultrices mauris. In sed sagittis sapien, vel lacinia odio. Pellentesque quis varius ex. Aliquam interdum neque et mi placerat, et vulputate ligula facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut vehicula dignissim enim id consequat. Vestibulum vulputate felis sit amet turpis lobortis varius. Maecenas quis lectus quam. Quisque ac sapien dui. Ut orci quam, viverra vel velit feugiat, fermentum cursus magna. Etiam et gravida magna, semper ullamcorper orci. Ut dapibus malesuada lorem, non malesuada dui maximus in. Sed pellentesque accumsan neque vel congue.Aliquam dignissim mi nisi, et tempor nibh bibendum non. Nulla scelerisque, sapien non vestibulum accumsan, lorem lectus rhoncus urna, eu scelerisque nunc nulla non tellus. Donec euismod eros congue, consectetur diam eu, pellentesque nulla. Aenean nec vehicula felis, sit amet aliquam diam. Nam eu ante mattis, consectetur sapien elementum, consequat dolor. Morbi ultrices ligula nec commodo viverra. Suspendisse in tincidunt eros, id ullamcorper quam. Praesent in dolor porttitor, pellentesque lorem et, vehicula justo. Phasellus id nunc eu ligula consectetur condimentum. Morbi ac pharetra massa. Cras in tortor sit amet lorem bibendum feugiat at nec turpis. Sed dui arcu, pretium et ornare in, sodales quis elit. Curabitur vestibulum purus eget felis commodo, vitae ullamcorper erat mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse efficitur massa sed velit condimentum aliquam. Suspendisse eget diam efficitur, consequat orci nec, lobortis odio. Donec non nisi eu',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Incidente,
  },

  {
    id:         2,
    nome:     'Agravo Regimental',
    lista:      [
                  tagData[2],
                ],
    classe:     'ADI',
    numero:     200,
    cadeira:    1,
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Incidente,
  },

  {
    id:         3,
    nome:     'Terceiro Agravo',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso.Pautado,
    tipo:       TipoDoProcesso.Merito,
  },

  {
    id:         4,
    nome:     'Quarto agravo',
    lista:      [
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso["Em julgamento"],
    tipo:       TipoDoProcesso.Merito,
  },

  {
    id:         5,
    nome:     'Quinto agravo',
    lista:      [
                  tagData[1],
                  tagData[2],
                  tagData[3],
                ],
    classe:     'ADI',
    numero:     300,
    cadeira:    1,
    descricao:  'Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. Mauris aliquet nunc non',
    situacao:   SituacaoDoProcesso["Apto a Julgar"],
    tipo:       TipoDoProcesso.Merito,
  },
];