//
//  Document.m
//  doc
//
//  Created by teren yeung on 2021/5/19.
//

#import "Document.h"

@implementation Document
    
- (id)contentsForType:(NSString*)typeName error:(NSError **)errorPtr {
    // Encode your document with an instance of NSData or NSFileWrapper
    return [[NSData alloc] init];
}
    
- (BOOL)loadFromContents:(id)contents ofType:(NSString *)typeName error:(NSError **)errorPtr {
    // Load your document from contents
    return YES;
}

@end
