//
//  GTNormalTableViewCell.m
//  demo
//
//  Created by teren yeung on 2021/5/19.
//

#import "GTNormalTableViewCell.h"

@interface GTNormalTableViewCell ()
@property(nonatomic, strong, readwrite) UILabel *titleLabel;
@property(nonatomic, strong, readwrite) UILabel *sourceLabel;
@property(nonatomic, strong, readwrite) UILabel *commentLabel;
@property(nonatomic, strong, readwrite) UILabel *timeLabel;
@property(nonatomic, strong, readwrite) UIImageView *imageView1;
@property(nonatomic, strong, readwrite) UIButton *delButton;


@end


@implementation GTNormalTableViewCell

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        [self.contentView addSubview:({
            self.titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 15, 300, 50)];
            self.titleLabel.font = [UIFont systemFontOfSize:12];
            self.titleLabel.textColor = [UIColor grayColor];
//            self.titleLabel.backgroundColor = [UIColor redColor];
            self.titleLabel;
        })];
        [self.contentView addSubview:({
            self.sourceLabel = [[UILabel alloc] initWithFrame:CGRectMake(20, 80, 50, 20)];
            self.titleLabel.font = [UIFont systemFontOfSize:12];
            self.titleLabel.textColor = [UIColor grayColor];
//            self.sourceLabel.backgroundColor = [UIColor redColor];
            self.sourceLabel;
        })];
        [self.contentView addSubview:({
            self.commentLabel = [[UILabel alloc] initWithFrame:CGRectMake(100, 80, 50, 20)];
            self.titleLabel.font = [UIFont systemFontOfSize:12];
            self.titleLabel.textColor = [UIColor grayColor];
//            self.commentLabel.backgroundColor = [UIColor redColor];
            self.commentLabel;
        })];
        [self.contentView addSubview:({
            self.timeLabel = [[UILabel alloc] initWithFrame:CGRectMake(150, 80, 50, 20)];
            self.timeLabel.font = [UIFont systemFontOfSize:12];
            self.timeLabel.textColor = [UIColor grayColor];
//            self.timeLabel.backgroundColor = [UIColor redColor];
            self.timeLabel;
        })];

        [self.contentView addSubview:({
            self.imageView1 = [[UIImageView alloc] initWithFrame:CGRectMake(330, 15, 70, 70)];
            self.imageView1.backgroundColor = [UIColor redColor];
            self.imageView1.contentMode = UIViewContentModeScaleAspectFill;
            self.imageView1;
        })];

        [self.contentView addSubview:({
            self.delButton = [[UIButton alloc] initWithFrame:CGRectMake(290, 80, 30, 20)];
            [self.delButton setTitle:@"X" forState:UIControlStateNormal];
            [self.delButton addTarget:self action:@selector(onDelBtnClick) forControlEvents:UIControlEventTouchUpInside];
            self.delButton.backgroundColor = [UIColor redColor];
            self.delButton.layer.cornerRadius = 10;
            self.delButton.layer.masksToBounds = YES;
            self.delButton.layer.borderColor = [UIColor lightGrayColor].CGColor;
            self.delButton.layer.borderWidth = 2;
            self.delButton;
        })];
    }

    return self;
}

-(void)onDelBtnClick {
    NSLog(@"Hello world");
    if (self.delegate && [self.delegate respondsToSelector:@selector(tableViewCell: clickDeleteButton:)]) {
        [self.delegate tableViewCell:self clickDeleteBtn:self.delButton];
    }
}

- (void)layoutTableViewCell {
    self.titleLabel.text = @"iOS";
    self.sourceLabel.text = @"极客";
    [self.sourceLabel sizeToFit];
    self.commentLabel.text = @"1888评论";
    [self.commentLabel sizeToFit];
    self.commentLabel.frame = CGRectMake(
            self.sourceLabel.frame.origin.x + self.sourceLabel.frame.size.width + 15,
            self.commentLabel.frame.origin.y,
            self.commentLabel.frame.size.width,
            self.commentLabel.frame.size.height);
    self.timeLabel.text = @"三分钟前";
    [self.timeLabel sizeToFit];
    self.timeLabel.frame = CGRectMake(
            self.commentLabel.frame.origin.x + self.commentLabel.frame.size.width + 15,
            self.timeLabel.frame.origin.y,
            self.timeLabel.frame.size.width,
            self.timeLabel.frame.size.height);
//    self.imageView1.image = [UIImage imageNamed:@"image/timg.jpeg"];
}

@end
