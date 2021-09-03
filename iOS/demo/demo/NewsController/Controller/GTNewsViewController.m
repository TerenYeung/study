//
//  GTNewsViewController.m
//  demo
//
//  Created by teren yeung on 2021/5/19.
//
//

#import "GTNewsViewController.h"
#import "GTNormalTableViewCell.h"
#import "GTDetailViewController.h"
#import "GTDeleteCellView.h"
#import "GTListLoader.h"


@interface GTNewsViewController ()<UITableViewDataSource, UITableViewDelegate, GTNormalTableViewCellDelegate>
//@interface ViewController ()
@property (nonatomic, strong, readwrite) UITableView *tableView;
@property (nonatomic, strong , readwrite) NSMutableArray *dataArray;
@property (nonatomic, strong, readwrite) GTListLoader *listLoader;
@end

@implementation GTNewsViewController
- (instancetype)init {
    self = [super init];
    if (self) {
        self.tabBarItem.title = @"新闻";

        _dataArray = @[].mutableCopy;
        for (int i = 0; i < 20; i++ ) {
            [_dataArray addObject:@(i)];
        }
//        self.tabBarItem.image = [UIImage imageNamed:@"image/video@2x.png"];
//        self.tabBarItem.selectedImage = [UIImage imageNamed:@"image/video_selected@2x.png"];
    }

    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    _tableView = [[UITableView alloc] initWithFrame:self.view.bounds];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    [self.view addSubview:_tableView];
    self.listLoader = [[GTListLoader alloc] init];
    [self.listLoader loadListData];
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return _dataArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    GTNormalTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"id"];

    if (!cell) {
        cell = [[GTNormalTableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"id"];
        cell.delegate = self;
    }
    [cell layoutTableViewCell];
//    cell.textLabel.text = @"主标题";
//    cell.detailTextLabel.text = @"副标题";
//    [cell.textLabel setText:@"主标题"];

    return cell;
}
//
//- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
//    return 100;
//}
//
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    GTDetailViewController *controller = [[GTDetailViewController alloc] init];
    controller.title = [NSString stringWithFormat:@"%@", @(indexPath.row)];
    [self.navigationController pushViewController:controller animated:YES];

}

- (void)tableViewCell:(UITableViewCell *)tableViewCell clickDeleteBtn:(UIButton *)deleteButton {
    NSLog(@"clickDeleteBtn");
    GTDeleteCellView *view = [[GTDeleteCellView alloc] initWithFrame:self.view.bounds];
    CGRect rect = [tableViewCell convertRect:deleteButton.frame toView:nil];
    // 因为是 block，所以要处理循环引用的问题
    // https://juejin.cn/post/6844903461327208461
    __weak typeof(self) wself = self;
    [view showDeleteViewFromPoint:rect.origin clickBlock:^{
        __strong typeof(self)strongSelf = wself;
        [strongSelf.dataArray removeLastObject];
        [strongSelf.tableView deleteRowsAtIndexPaths:@[[strongSelf.tableView indexPathForCell:tableViewCell]] withRowAnimation:UITableViewRowAnimationAutomatic];
    }];
}


@end


//int (^MyBlock)(int, int) = ^(int a, int b) {
//    return a + b;
//};
//
//MyBlock(12, 56);
