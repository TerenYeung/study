//
//  GTNormalTableViewCell.h
//  demo
//
//  Created by teren yeung on 2021/5/19.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@protocol GTNormalTableViewCellDelegate <NSObject>
- (void)tableViewCell:(UITableViewCell *)tableViewCell clickDeleteBtn:(UIButton *)deleteButton;
@end

@interface GTNormalTableViewCell : UITableViewCell
@property(nonatomic, weak, readwrite) id <GTNormalTableViewCellDelegate> delegate;

- (void)layoutTableViewCell;
@end

NS_ASSUME_NONNULL_END
