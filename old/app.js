const writeFileAsync = require('./writeFile');

async function getData() {
  var myHeaders = new Headers();

  myHeaders.append('X-IG-App-ID', '936619743392459');
  myHeaders.append('Referer', 'https://www.instagram.com/dimit31/following/');
  myHeaders.append(
    'Cookie',
    'ds_user_id=66601905431; sessionid=66601905431%3ACq5NcoENMAZLa2%3A19%3AAYfcqFJxCuDFruUFwPt_e94H98w_3ISICBVWT3KGuA;'
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  for (let i = 0; i <= 600; i += 200) {
    console.log(i);
    const response = await fetch(
      `https://www.instagram.com/api/v1/friendships/3116984713/followers/?count=200&max_id=${i}`,
      requestOptions
    );

    const parsedUsers = await response.json();
    await writeFileAsync(parsedUsers);
  }
}

getData();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// mid=ZptFDQAEAAGECwmJirbG4uB_MSo5; ig_did=2F54148A-A75F-4056-BC62-AA8E68E2B6FF; datr=FEWbZuX8EnxZwJP9H-kuP4q2; shbid="18205\05466601905431\0541753000760:01f7cd4d5d23d65413cf1ff5e732f283792ac27713f10503346fed709289ef2376d20e1a"; shbts="1721464760\05466601905431\0541753000760:01f7e55cdb3064f56bbcbd6e5da46e092186e1cb0b3eafcea7b2538410650690dd0d25c9"; wd=595x966; csrftoken=ATJfGhB0eekngKAPYbcbTs3g8DNszkNE; ds_user_id=66601905431; sessionid=66601905431%3ACq5NcoENMAZLa2%3A19%3AAYfcqFJxCuDFruUFwPt_e94H98w_3ISICBVWT3KGuA; rur="LDC\05466601905431\0541753002114:01f7465417df155ec05c483b29cce4883370bdc53a8d06151d11c90437379481c4829737"
