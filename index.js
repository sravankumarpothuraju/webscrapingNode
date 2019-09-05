const rp = require("request-promise");
const otcsv = require("objects-to-csv");
const cheerio = require("cheerio");

const bankDetails = require("./class");
let obj_array = [];
let links = [];
rp("https://www.bank-codes.com/countries").then(html => {
  let $ = cheerio.load(html);
  //console.log(html);
  $(".tab-data ul li a").each(function () {
    var link = $(this).attr("href");
    link = "http://www.bank-codes.com" + link;
    links.push({
      link: link,
    });
  });

  //console.log(links);

  for (let i = 0; i < links.length; i++) {
    rp(links[i].link).then(html => {
      let $ = cheerio.load(html);
      let banklinks = [];
      $(".tab-data ul li a").each(function () {
        var banklink = $(this).attr("href");
        banklink = "http://www.bank-codes.com" + banklink;
        banklinks.push({
          banklink: banklink,
        });
      });

      //console.log(banklinks);

      for (let j = 0; j < banklinks.length; j++) {
        rp(banklinks[j].banklink)
          .then(html => {
            let $ = cheerio.load(html);
            let x = 0;
            let bank_obj = new bankDetails();

            $("div .data-table  td").each(function () {
              var link = $(this)
                .text()
                .trim();
              // console.log(link);
              // console.log(x);

              switch (x) {
                case 0:
                  bank_obj.institution = link;
                  break;
                case 1:
                  bank_obj.bankName = link;
                  break;
                case 2:
                  bank_obj.branchCode = link;
                  break;
                case 4:
                  bank_obj.address = link;
                  break;
                case 5:
                  bank_obj.city = link;
                  break;
                case 6:
                  bank_obj.postalCode = link;
                  break;
                case 7:
                  bank_obj.country = link;
                  break;
                case 9:
                  bank_obj.swiftCode = link;
                  break;
                case 11:
                  bank_obj.swiftCodeEightChar = link;
                  break;

                default:
                  break;
              }
              x = x + 1;
            });
            //console.log(bank_obj);
            obj_array.push(bank_obj);
            (async () => {
              const csv = new otcsv(obj_array);

              // Save to file:
              await csv.toDisk("./test5.csv");

              // Return the CSV file as string:
              //console.log(await csv.toString());
            })();
          })
          .catch(err => console.error(err.message));
      }
    });
  }
});

const getLinks = (link) => {
  return () => {

    // get the list of links from the url in link above

    return links;
  }
}

setTimeout(getLinks, 5000)