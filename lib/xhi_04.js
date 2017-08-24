/*jslint node : true */
// == BEGIN PUBLIC METHOD /pullFn/ ===================================
function pullFn () {
  'use strict';
  var
    ctx_obj     = this,
    catch_fn    = ctx_obj.catchFn,
    command_map = ctx_obj.commandMap,
    log_fn      = ctx_obj.logFn,
    next_fn     = ctx_obj.nextFn,
    prefix_str  = '  ' + ctx_obj.makePrefixStr( command_map ),

    stream_obj
    ;

  // Spawn git pull process
  log_fn( prefix_str + 'Start' );
  process.chdir( ctx_obj.fqProjDirname );
  stream_obj = ctx_obj.makeSpawnObj( 'git', [ 'pull' ] );
  process.chdir( ctx_obj.fqOrigDirname );

  // Add stream handlers
  stream_obj.stdout.on( 'data', function ( data ) {
    process.stdout.write( data.toString() ); }
  );
  stream_obj.stderr.on( 'data', function ( data ) {
    process.stderr.write( data.toString() ); }
  );
  stream_obj.on( 'close',
    function ( exit_code ) {
      if ( exit_code === 0 ) {
        log_fn( prefix_str + 'Success' );
        next_fn();
      }
      else {
        catch_fn( prefix_str + 'Fail' );
      }
    }
  );
}
// == . END PUBLIC METHOD /pullFn/ ===================================
module.exports = pullFn;