//
//  DocumentBrowserViewController.h
//  doc
//
//  Created by teren yeung on 2021/5/19.
//

#import <UIKit/UIKit.h>

@interface DocumentBrowserViewController : UIDocumentBrowserViewController

- (void)presentDocumentAtURL:(NSURL *)documentURL;

@end
