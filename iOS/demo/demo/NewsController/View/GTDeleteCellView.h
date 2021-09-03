//
//  GTDeleteCellView.h
//  demo
//
//  Created by teren yeung on 2021/5/19.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface GTDeleteCellView : UIView
-(void)showDeleteViewFromPoint:(CGPoint) point clickBlock:(dispatch_block_t) clickBlock;
@end

NS_ASSUME_NONNULL_END
