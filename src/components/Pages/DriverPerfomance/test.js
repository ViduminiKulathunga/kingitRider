let date = new Date().toISOString();
let out = new Date(date);
//let p = out.toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });
let p = out.toLocaleTimeString("en-GB", {
  timeZone: "Asia/Colombo",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});

<List>
  {this.generate(
    <ListItem>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary="Single-line item" secondary={"Secondary text"} />
    </ListItem>
  )}
</List>;

let ListPrint = this.props.alcoholPerMonthFromParent //console.log(alcoholPerMonthFromParent, " alcoholPerMonthFromParent");
  ? alcoholPerMonthFromParent.map((item, i) => {
      //console.log(item.createdAt, " item.createdAt");
      //console.log(item.createdAt.substring(0, 10), " item.Date");
      let drunkenDate = item.createdAt.substring(0, 10);

      let out = new Date(item.createdAt);
      let drunkenTime = out.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Colombo",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      });
      // console.log(drunkenDate, " ",drunkenTime, " item.Time");
      //this.printElement(drunkenDate, drunkenTime);
      <UserListItem
        key={item.handle}
        drunkenDate={drunkenDate}
        drunkenTime={drunkenTime}
      />;
    })
  : null;
