import md5 from 'md5';

export const user = {
  session: {
    authenticated: false
  },
  username : "mster999",
  photo : "https://avatars0.githubusercontent.com/u/12564462?s=460&u=34211ea1b047a790389786ccab22ea7b212a23a0&v=40",
  fav_drinks : [
    "Gin and Tonic",
    "Sex on the Beach",
    "Bloody Mary"
  ],
  comments : [
    {
      "drink" : "Gin and Tonic",
      "post" : "I like to add orange slices to my gin and tonic <3",
      "post_id" : "1fe3fe312212faDF"
    }
  ],
  uid : "4rer322fafrffda",
  pwdHash: md5('password1')
}
