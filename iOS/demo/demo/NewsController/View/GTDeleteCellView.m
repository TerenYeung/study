//
//  GTDeleteCellView.m
//  demo
//
//  Created by teren yeung on 2021/5/19.
//

#import "GTDeleteCellView.h"

@interface GTDeleteCellView()
@property (nonatomic, strong, readwrite) UIView *backgroundView;
@property (nonatomic, strong, readwrite) UIButton *deleteButton;
@property (nonatomic, copy, readwrite) dispatch_block_t deleteBlock;
@end

@implementation GTDeleteCellView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/
- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self addSubview:({
            _backgroundView = [[UIView alloc] initWithFrame:self.bounds];
            _backgroundView.backgroundColor = [UIColor blackColor];
            _backgroundView.alpha = 0.5;
            [_backgroundView addGestureRecognizer:({
                UIGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(dismissDeleteView)];
                tapGesture;
            })];
            _backgroundView;
        })];

        [self addSubview:({
            _deleteButton = [[UIButton alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
            [_deleteButton addTarget:self action:@selector(_clickButton) forControlEvents:UIControlEventTouchUpInside];
            [_deleteButton setBackgroundColor:[UIColor blueColor]];
            _deleteButton;
        })];
    }
    return self;
}

-(void)showDeleteViewFromPoint:(CGPoint) point clickBlock:(dispatch_block_t) clickBlock{
    _deleteButton.frame = CGRectMake(point.x, point.y, 0, 0);
    _deleteBlock = [clickBlock copy];
    [[UIApplication sharedApplication].keyWindow addSubview:self];
//    [UIView animateWithDuration:1.f animations:^{
//        self.deleteButton.frame = CGRectMake((self.bounds.size.width-200)/2, (self.bounds.size.height - 200)/2, 200, 200);
//    }];
    [UIView animateWithDuration:1.f delay:0.f usingSpringWithDamping:0.5 initialSpringVelocity:0.5 options:UIViewAnimationCurveEaseInOut animations:^{
        self.deleteButton.frame = CGRectMake((self.bounds.size.width-200)/2, (self.bounds.size.height - 200)/2, 200, 200);
    } completion:^(BOOL finished) {
        NSLog(@"finish");
    }];
}

-(void)dismissDeleteView {
    [self removeFromSuperview];
}

-(void)_clickButton {
    if (_deleteBlock) {
        _deleteBlock();
    }
    [self dismissDeleteView];
}
@end
